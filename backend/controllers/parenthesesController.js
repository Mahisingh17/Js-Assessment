/**
 * Generator function to yield valid balanced parentheses combinations for a given n.
 * Uses backtracking but avoids excessive memory usage by yielding results one-by-one.
 * 
 * @param {number} n - Number of pairs of parentheses
 * @param {string} current - Current sequence being built
 * @param {number} open - Number of open brackets used
 * @param {number} close - Number of close brackets used
 */
function* generateParentheses(n, current = "", open = 0, close = 0) {
    if (current.length === n * 2) {
        yield current;
        return;
    }
    if (open < n) yield* generateParentheses(n, current + "(", open + 1, close);
    if (close < open) yield* generateParentheses(n, current + ")", open, close + 1);
}

/**
 * Controller to handle API requests for generating balanced parentheses.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
exports.getParentheses = async (req, res) => {
    const n = parseInt(req.query.n);

    if (isNaN(n) || n < 0) {
        return res.status(400).json({ error: "Invalid input. Please provide a positive integer." });
    }

    try {
        const generator = generateParentheses(n);
        const result = [];

        for (const sequence of generator) {
            result.push(sequence);
        }

        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: "Server error. Unable to generate parentheses." });
    }
};
