;; Importing the previously discussed NFT contract
(import nft)

;; Data structure for loans
(define-map loans 
{
    token-id: uint
}
{
    owner: principal,
    loan-amount: uint,
    remaining-amount: uint,
    interest-rate: uint   ;; This is a basic representation; in a real-world scenario, interest might be calculated differently.
})

;; Initiate a loan against an NFT
(define-public (initiate-loan (token-id uint) (loan-amount uint) (interest-rate uint))
    (let (
        (nft-owner (unwrap! (nft::get-nft-details token-id) (err "Token ID not found")))
    )
        ;; Check if the NFT owner is the same as the transaction sender
        (asserts! (is-eq (get address nft-owner) tx-sender) (err "Only the owner can initiate a loan"))

        ;; Check if the NFT is not already collateralized
        (asserts! (is-none (map-get? loans { token-id: token-id })) (err "Loan already exists for this NFT"))

        ;; Add loan details to the map
        (map-insert loans { token-id: token-id } { owner: tx-sender, loan-amount: loan-amount, remaining-amount: (+ loan-amount (* (/ loan-amount 100) interest-rate)), interest-rate: interest-rate })
        
        (ok true)
    )
)

;; Repay a part of the loan
(define-public (repay-loan (token-id uint) (amount uint))
    (let (
        (loan-details (unwrap! (map-get? loans { token-id: token-id }) (err "Loan not found")))
    )
        ;; Ensure that the sender is the owner of the loan
        (asserts! (is-eq (get owner loan-details) tx-sender) (err "Only the owner can repay the loan"))

        ;; Update the remaining amount
        (map-set loans { token-id: token-id } { owner: tx-sender, loan-amount: (get loan-amount loan-details), remaining-amount: (- (get remaining-amount loan-details) amount), interest-rate: (get interest-rate loan-details) })
        
        (ok true)
    )
)

;; Fetch loan details
(define-read-only (get-loan-details (token-id uint))
    (map-get? loans { token-id: token-id })
)

;; ... (Other financial functions, e.g., defaulting on a loan, transferring a loan, etc.)
