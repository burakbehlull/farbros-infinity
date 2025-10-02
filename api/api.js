import app from "./app.js";

const PORT = process.env.PORT || 80;

export default function startApi() {
    app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
}
