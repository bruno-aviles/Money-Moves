// Payment Display:
function monthlyPaymentDisplay(){
    let loanAmount = document.getElementById("loanAmount").value;
    let loanTerm = document.getElementById("loanTerm").value;
    let interestRate = document.getElementById("interestRate").value;

    let annualPercentageRate = monthlyInterestRate(interestRate);

    // Monthly Cost
    let monthlyPayment = ((Number(loanAmount) * Number(annualPercentageRate)) * Math.pow(1 + Number(annualPercentageRate), Number(loanTerm))) / (Math.pow(1 + Number(annualPercentageRate), Number(loanTerm)) - 1);
    document.getElementById("monthlyPayment").innerHTML = `$${monthlyPayment.toFixed(2)}`;
    
    // Total Loan Cost
    let totalCost = totalAmount(loanTerm, monthlyPayment);
    document.getElementById("totalCost").innerHTML = `$${Number(totalCost).toFixed(2)}`;

    // Total Interest Cost
    let totalInterestAmount = interestAmount(totalCost, loanAmount);
    document.getElementById("totalInterest").innerHTML = `$${Number(totalInterestAmount).toFixed(2)}`;
    
    // Display total cost
    document.getElementById("totalPrincipal").innerHTML = `$${Number(loanAmount).toFixed(2)}`;
}

// convert from annual percentage to a monthly percentage
function monthlyInterestRate(rate){
    let annualPercentageRate = ((rate / 100) / 12);
    return annualPercentageRate;
}
// the total interest charged from the loan term  
function interestAmount(totalAmount, principalAmount){
    let totalInterest = (Number(totalAmount) - Number(principalAmount));
    return totalInterest;
}
// Total Loan Amount, principal and interest amount
function totalAmount(loanTerm, monthlyPayment){
    let totalCost = (Number(loanTerm) * Number(monthlyPayment));
    return totalCost;
}

// Display

// the month(1 corresponding to the 1st month of payment, through the total number of months)

// The payment amount

// the principal paid this month

// the totalinterest paid to date

// the remaining loan balance at the end of the month