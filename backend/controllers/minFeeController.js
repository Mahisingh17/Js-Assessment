exports.getMinFee = (req, res) => {
    const { selectedCourses, prices } = req.body;

    if (!selectedCourses || !prices) {
        return res.status(400).json({ error: "Both selectedCourses and prices are required" });
    }

    function minCricketCourseFee(selectedCourses, prices) {
        let minCost = Infinity;
        const courseCombinations = [
            ["A", "B", "C"], ["AB", "C"], ["AC", "B"], ["BC", "A"], ["ABC"]
        ];

        for (let combo of courseCombinations) {
            let totalCost = 0;
            let covered = new Set();

            for (let course of combo) {
                if (selectedCourses.includes(course) && prices[course]) {
                    totalCost += prices[course];
                    for (let c of course.split("")) covered.add(c);
                }
            }

            if (covered.size === 3) minCost = Math.min(minCost, totalCost);
        }

        return minCost === Infinity ? { error: "No valid combination found" } : { minFee: minCost };
    }

    const result = minCricketCourseFee(selectedCourses, prices);
    res.json(result);
};