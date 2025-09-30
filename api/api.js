import app from "./app";

const PORT = process.env.PORT || 80;

export default function setupApi() {
    app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
}
