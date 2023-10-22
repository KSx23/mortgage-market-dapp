;; Import the nft.clar contract to interact with NFT functions
(import nft)

;; Define a data structure to represent a listing in the marketplace
(define-map listings 
{
    token-id: uint
}
{
    price: uint,
    seller: principal
})

;; Define a function to list an NFT for sale
(define-public (list-for-sale (token-id uint) (price uint))
    (let (
        (nft-owner (unwrap! (nft::get-nft-details token-id) (err "Token ID not found")))
    )
        (asserts! (is-eq (get address nft-owner) tx-sender) (err "Only the owner can list the NFT for sale"))
        (map-insert listings { token-id: token-id } { price: price, seller: tx-sender })
        (ok true)
    )
)

;; Define a function to buy a listed NFT
(define-public (purchase (token-id uint))
    (let (
        (listing-details (unwrap! (map-get? listings { token-id: token-id }) (err "Listing not found")))
        (buyer tx-sender)
    )
        ;; Verify that the buyer has sent the correct payment
        (asserts! (>= (stx-get-balance buyer) (get price listing-details)) (err "Insufficient funds"))
        
        ;; Transfer STX from buyer to seller
        (stx-transfer? (get price listing-details) buyer (get seller listing-details))
        
        ;; Transfer NFT from seller to buyer
        (nft::transfer token-id buyer)
        
        ;; Remove the NFT from the listing
        (map-delete listings { token-id: token-id })
        (ok true)
    )
)

;; Define a function to delist an NFT (remove from sale)
(define-public (delist (token-id uint))
    (let (
        (listing-details (unwrap! (map-get? listings { token-id: token-id }) (err "Listing not found")))
    )
        (asserts! (is-eq (get seller listing-details) tx-sender) (err "Only the owner can delist the NFT"))
        (map-delete listings { token-id: token-id })
        (ok true)
    )
)

;; Define a function to fetch details of a listed NFT
(define-read-only (get-listing-details (token-id uint))
    (map-get? listings { token-id: token-id })
)

;; We might also want functions to handle loans against NFTs, etc. but these are complex and would need more details.

;; ... (Other functions related to the marketplace)
