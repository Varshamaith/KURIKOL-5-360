function applyLoan() {
    if (!selectedLoan) return alert("Please select a loan first!");

    const farmerId = localStorage.getItem("farmerId");
    const loanAmount = prompt("Enter Loan Amount (in ₹):");
    const emiPercentage = prompt("Enter EMI Percentage (% per annum):");

    if (!farmerId || !loanAmount || !emiPercentage) {
        alert("Please fill all loan details!");
        return;
    }

    fetch("http://localhost:5000/apply-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            farmerId,
            loanId: selectedLoan.loanId,
            loanName: selectedLoan.loanName,
            loanAmount: parseFloat(loanAmount),
            emiPercentage: parseFloat(emiPercentage)
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("applyLoanBtn").innerText = "Applied ✅";
        document.getElementById("applyLoanBtn").disabled = true;
    })
    .catch(error => console.error("Error:", error));
}
