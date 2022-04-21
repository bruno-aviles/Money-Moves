// Output include the following:
function monthlyPaymentDisplay(){
    let loanAmount = document.getElementById("loanAmount").value;
    let loanTerm = document.getElementById("loanTerm").value;
    let interestRate = document.getElementById("interestRate").value;

    let annualPercentageRate = monthlyInterestRate(interestRate);
    let totalInterestAmount = interestAmount(loanAmount, annualPercentageRate);
    let totalCost = totalAmount(loanAmount, totalInterestAmount);

    // Monthly Cost
    let monthlyPayment = ((Number(loanAmount) * Number(annualPercentageRate)) * Math.pow(1 + Number(annualPercentageRate), Number(loanTerm))) / (Math.pow(1 + Number(annualPercentageRate), Number(loanTerm)) - 1);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    
    // alert(monthlyPayment);

    // display total cost
    document.getElementById("totalPrincipal").innerHTML = `$${Number(loanAmount).toFixed(2)}`;
    document.getElementById("totalInterest").innerHTML = `$${Number(totalInterestAmount).toFixed(2)}`;
    document.getElementById("totalCost").innerHTML = `$${Number(totalCost).toFixed(2)}`;

}

// convert from annual percentage to a monthly percentage
function monthlyInterestRate(rate){
    let annualPercentageRate = ((rate / 100) / 12);
    return annualPercentageRate;
}
// total interest from principal
function interestAmount(principal, apr){
    let totalInterest = (principal * apr);
    return totalInterest;
}
// Total Loan Amount, principal and interest amount
function totalAmount(principal, interestAmount){
    let totalCost = (Number(principal) + Number(interestAmount));
    return totalCost;
}

// the month(1 corresponding to the 1st month of payment, through the total number of months)

// The payment amount

// the principal paid this month

// the totalinterest paid to date

// the remaining loan balance at the end of the month