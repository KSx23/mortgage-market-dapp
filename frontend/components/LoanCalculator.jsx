import React, { useState } from 'react';

const LoanCalculator = ({ nftValue }) => {
    const [loanAmount, setLoanAmount] = useState(nftValue || 0);
    const [interestRate, setInterestRate] = useState(5); // Default interest rate
    const [loanTerm, setLoanTerm] = useState(12); // Default loan term in months
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateMonthlyPayment = () => {
        // Simple loan calculator formula
        // M = P[r(1+r)^n] / [(1+r)^n – 1]
        const r = interestRate / 1200; // Convert annual rate to monthly and percentage to decimal
        const n = loanTerm;
        const payment = loanAmount * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setMonthlyPayment(payment.toFixed(2));
    };

    return (
        <div className="loan-calculator">
            <h2>Loan Calculator</h2>

            <label>
                NFT Value (STX):
                <input type="number" value={nftValue} readOnly />
            </label>

            <label>
                Loan Amount (STX):
                <input 
                    type="number" 
                    value={loanAmount} 
                    onChange={e => setLoanAmount(e.target.value)} 
                />
            </label>

            <label>
                Interest Rate (% p.a.):
                <input 
                    type="number" 
                    value={interestRate} 
                    onChange={e => setInterestRate(e.target.value)} 
                />
            </label>

            <label>
                Loan Term (months):
                <input 
                    type="number" 
                    value={loanTerm} 
                    onChange={e => setLoanTerm(e.target.value)} 
                />
            </label>

            <button onClick={calculateMonthlyPayment}>Calculate Monthly Payment</button>

            <p>Estimated Monthly Payment: {monthlyPayment} STX</p>

            {/* You can add more loan features or options here */}
        </div>
    );
};

export default LoanCalculator;
