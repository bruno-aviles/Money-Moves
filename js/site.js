// Payment Display:
function monthlyPaymentDisplay(){
    let loanAmount = document.getElementById("loanAmount").value;
    let loanTerm = document.getElementById("loanTerm").value;
    let interestRate = document.getElementById("interestRate").value;

    let monthlyRate = monthlyInterestRate(interestRate);

    // Reset Alert Message
    let alertMessage = document.getElementById("alertMessage").classList;
    alertMessage.remove("invisible");
    alertMessage.add("visible");

    // reset table data and visibility
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    
    let tableVisibility = document.getElementById("tableVisibility").classList;
    tableVisibility.add("invisible");

    // Monthly Payment Formula
    let monthlyPayment = ((Number(loanAmount) * Number(monthlyRate)) * Math.pow(1 + Number(monthlyRate), Number(loanTerm))) / (Math.pow(1 + Number(monthlyRate), Number(loanTerm)) - 1);

    // validate proper data entry
    if(loanAmount == 0 && loanTerm == 0 && interestRate == 0){
        alert("Please submit loan details");
        // Reset to display $0.00
        document.getElementById("monthlyPayment").innerHTML = `$0.00`;
        document.getElementById("totalCost").innerHTML = `$0.00`;
        document.getElementById("totalInterest").innerHTML = `$0.00`;
        document.getElementById("totalPrincipal").innerHTML = `$0.00`;
    } else if(loanAmount <= 0 || isNaN(loanAmount)){
        alert("Please submit the amount of your loan");
        // Reset to display $0.00
        document.getElementById("monthlyPayment").innerHTML = `$0.00`;
        document.getElementById("totalCost").innerHTML = `$0.00`;
        document.getElementById("totalInterest").innerHTML = `$0.00`;
        document.getElementById("totalPrincipal").innerHTML = `$0.00`;
    } else if(loanTerm <= 0 || isNaN(loanAmount)){
        alert("Please submit the amount of months for your loan");
        // Reset to display $0.00
        document.getElementById("monthlyPayment").innerHTML = `$0.00`;
        document.getElementById("totalCost").innerHTML = `$0.00`;
        document.getElementById("totalInterest").innerHTML = `$0.00`;
        document.getElementById("totalPrincipal").innerHTML = `$0.00`;
    } else if(interestRate == "" || interestRate < 0 || isNaN(interestRate)){
        alert("Please submit fixed interest rate");
        // Reset to display $0.00
        document.getElementById("monthlyPayment").innerHTML = `$0.00`;
        document.getElementById("totalCost").innerHTML = `$0.00`;
        document.getElementById("totalInterest").innerHTML = `$0.00`;
        document.getElementById("totalPrincipal").innerHTML = `$0.00`;
    }

    if(loanAmount > 0 && loanTerm > 0 && interestRate != "" ){
    
        // Display Monthly Payment
        document.getElementById("monthlyPayment").innerHTML = `$${Number(monthlyPayment.toFixed(2)).toLocaleString("en-US")}`;
        
        // Total Loan Cost
        let totalCost = totalAmount(loanTerm, monthlyPayment);
        // Display Total Loan Cost
        document.getElementById("totalCost").innerHTML = `$${Number(totalCost.toFixed(2)).toLocaleString("en-US")}`;

        // Total Interest Cost
        let totalInterestAmount = interestAmount(totalCost, loanAmount);
        // Display Total Interest Cost
        document.getElementById("totalInterest").innerHTML = `$${Number(totalInterestAmount.toFixed(2)).toLocaleString("en-US")}`;
        
        // Display principal cost
        document.getElementById("totalPrincipal").innerHTML = `$${Number(loanAmount).toLocaleString("en-US")}`;

        // Remove Table Visibility and Remove Alert Message
        tableVisibility.remove("invisible");
        
        alertMessage.remove("visible");
        alertMessage.add("invisible")

        // Create data for loan info section
        paymentTableInfo();
    }
}

// convert from annual percentage to a monthly percentage
function monthlyInterestRate(rate){
    let monthlyRate = ((rate / 100) / 12);
    return monthlyRate;
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

// calculate interest portion of the monthly payment
function getInterestPortion(loanAmount, interestRate){
    let percentageToDecimal = (interestRate / 100);
    let interestPortion = ((Number(percentageToDecimal) * loanAmount) / 12);
    
    return interestPortion;
}

// Calculate principal portion of the monthly payment
function getPrincipalPortion(monthlyPayment, interestPortion){
    let principalPortion = (monthlyPayment - interestPortion);

    return principalPortion;
}

// Create Data for Loan Info Table
function paymentTableInfo(){

    // obtain table and template
    let tableBody = document.getElementById("tableBody");
    let templateRow = document.getElementById("templateRow");

    // clear all table data
    tableBody.innerHTML = "";

    // Month Display
    let loanTerm = document.getElementById("loanTerm").value;
    let loanAmount = document.getElementById("loanAmount").value;
    let interestRate = document.getElementById("interestRate").value;
    let monthlyRate = monthlyInterestRate(interestRate);
    
    // monthly payment formula
    let monthlyPayment = ((Number(loanAmount) * Number(monthlyRate)) * Math.pow(1 + Number(monthlyRate), Number(loanTerm))) / (Math.pow(1 + Number(monthlyRate), Number(loanTerm)) - 1);

    // interest paid
    let interestPaid = 0;

    // validate visibility
    let tableVisibility = document.getElementById("tableVisibility").classList;
    if(tableVisibility.contains("invisible")){
        return
    } else {
        // Create Table
        for (let m = 1; m <= loanTerm; m++) {
            
            // copy all data from template
            let tableRow = document.importNode(templateRow.content, true);

            // interest and principal portion of monthly payment
            let interestAmount = getInterestPortion(loanAmount, interestRate);
            let principalAmount = getPrincipalPortion(monthlyPayment, interestAmount);

            // interest paid
            interestPaid = interestPaid + interestAmount;

            // subtract loan balance
            loanAmount = loanAmount - principalAmount;

            // store your values in object
            let loanResults = {};
            // add month number to property "month"
            loanResults.month = m;
            // add monthly payment to property "payment"
            loanResults.payment = monthlyPayment;        
            // add principal payment to property "principal"     
            loanResults.principal = principalAmount;
            // add interest payment to property "interest"
            loanResults.interest = interestAmount;
            // add total amount of interest paid to property "Total Interest"
            loanResults.totalInterest = interestPaid;
            // add remaining balance to property "Balance"
            loanResults.balance = loanAmount;

            
            // obtain <tr> row element
            let row = tableRow.getElementById("row");
            // obtain all the <td> elements and store them in an array
            let rowCols = tableRow.querySelectorAll("td");;

            // add month and monthly payment to td element
            if(loanResults.month % 2 == 0){
                row.classList.add("evenRow");
                // the month(1 corresponding to the 1st month of payment, through the total number of months)
                rowCols[0].textContent = loanResults.month;
                // The payment amount
                rowCols[1].textContent = `$${Number(loanResults.payment.toFixed(2)).toLocaleString("en-US")}`;
                // the principal paid for the month
                rowCols[2].textContent = `$${Number(loanResults.principal.toFixed(2)).toLocaleString("en-US")}`;
                // interest paid for the month 
                rowCols[3].textContent = `$${Number(loanResults.interest.toFixed(2)).toLocaleString("en-US")}`;
                // total interest paid to date
                rowCols[4].textContent = `$${Number(loanResults.totalInterest.toFixed(2)).toLocaleString("en-US")}`;
                // the remaining new balance at the end of the month
                rowCols[5].textContent = `$${Number(loanResults.balance.toFixed(2)).toLocaleString("en-US")}`;
                
            } else {
                row.classList.add("oddRow");
                // the month(1 corresponding to the 1st month of payment, through the total number of months)
                rowCols[0].textContent = loanResults.month;
                // The payment amount
                rowCols[1].textContent = `$${Number(loanResults.payment.toFixed(2)).toLocaleString("en-US")}`;
                // the principal paid for the month
                rowCols[2].textContent = `$${Number(loanResults.principal.toFixed(2)).toLocaleString("en-US")}`;
                //the interest paid for the month
                rowCols[3].textContent = `$${Number(loanResults.interest.toFixed(2)).toLocaleString("en-US")}`;
                // total interest paid to date
                rowCols[4].textContent = `$${Number(loanResults.totalInterest.toFixed(2)).toLocaleString("en-US")}`;
                // the remaining loan balance at the end of the month
                rowCols[5].textContent = `$${Number(loanResults.balance.toFixed(2)).toLocaleString("en-US")}`;
            }
            tableBody.appendChild(tableRow);
        } 
    }

}