import app from "./app.js";

const PORT = process.env.PORT || 80;

export default function startApi() {
    console.log('pe', process.env)
    app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
}
