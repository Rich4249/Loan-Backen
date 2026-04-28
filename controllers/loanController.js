import pool from "../config/db.js";

export const submitLoan = async (req, res) => {
  const { fullName, email, phone, loanAmount, income, employer, ssn } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO loans (user_id, full_name, email, phone, loan_amount, income, employer, ssn)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        req.user.id,
        fullName,
        email,
        phone,
        loanAmount,
        income,
        employer,
        ssn
      ]
    );

    res.json({ message: "Loan application submitted", loan: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Error submitting loan", error: err.message });
  }
};

export const getLoans = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json({ loans: result.rows });
  } catch (err) {
    res.status(500).json({ message: "Error fetching loans", error: err.message });
  }
};
