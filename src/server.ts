import App from "./config/App";

const port = process.env.PORT || 5000;

App.listen(port, () => console.log(`App listening on port ${port}`));
