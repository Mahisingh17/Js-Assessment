const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const minFeeRoutes = require("./routes/minFeeRoutes");
const parenthesesRoutes = require("./routes/parenthesesRoutes");
const calculateEditDistanceRoutes = require("./routes/calculateEditDistanceRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/min-fee", minFeeRoutes);
app.use("/parentheses", parenthesesRoutes);
app.use("/edit-distance", calculateEditDistanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
