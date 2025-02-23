exports.getCalculateEditDistance = (req, res) => {
    const { s, t } = req.body;

    if (s === undefined || t === undefined) {
        return res.status(400).json({ error: "Both 's' and 't' are required." });
    }

    function calculateEditOperations(s, t) {
        let m = s.length;
        let n = t.length;
        
        let previousRow = Array(n + 1).fill(0);
        let currentRow = Array(n + 1).fill(0);

        // Initialize base cases
        for (let j = 0; j <= n; j++) 
            previousRow[j] = j;

        for (let i = 1; i <= m; i++) {
            currentRow[0] = i;
            for (let j = 1; j <= n; j++) {
                if (s[i - 1] === t[j - 1])
                    currentRow[j] = previousRow[j - 1]; // No operation needed
                else
                    currentRow[j] = 1 + Math.min(
                        currentRow[j - 1],   // Insert
                        previousRow[j],      // Remove
                        previousRow[j - 1]   // Replace
                    );
            }
            previousRow = [...currentRow];
        }

        return previousRow[n];
    }

    const distance = calculateEditOperations(s, t);
    res.json({ editDistance: distance });
};
