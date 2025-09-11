// Function to calculate EMI (Equated Monthly Installment)
// This formula is a standard financial calculation
export const calculateEMI = (principal, annualInterestRate, tenureMonths) => {
  // Convert annual interest rate to a monthly rate
  const monthlyInterestRate = (annualInterestRate / 100) / 12;

  // Handle the edge case where interest rate is 0 to avoid division by zero
  if (monthlyInterestRate === 0) {
    return principal / tenureMonths;
  }

  // The EMI formula: P * R * (1+R)^N / ((1+R)^N - 1)
  const emi = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths) / (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
  
  // Format the EMI to two decimal places and return as a number
  return parseFloat(emi.toFixed(2));
};

// Function to generate the full repayment schedule for a loan
export const generateRepaymentSchedule = (loan) => {
  // Calculate the fixed monthly EMI
  const emi = calculateEMI(loan.amount, loan.interestRate, loan.tenureMonths);
  const repayments = [];
  let remainingPrincipal = loan.amount;

  // Loop for each month of the loan tenure
  for (let i = 1; i <= loan.tenureMonths; i++) {
    // Calculate the interest component for the current month
    const interestComponent = remainingPrincipal * ((loan.interestRate / 100) / 12);
    
    // The principal component is what's left after paying interest
    const principalComponent = emi - interestComponent;
    
    // Reduce the remaining loan balance
    remainingPrincipal -= principalComponent;

    // Create a new repayment record for this month
    repayments.push({
      loanId: loan._id,
      // Set due date for each month
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + i)),
      amount: emi,
      paid: false, // Repayment is unpaid by default
    });
  }

  return repayments;
};