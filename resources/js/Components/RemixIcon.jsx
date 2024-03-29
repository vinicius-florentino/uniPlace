export default function RemixIcon({ className, fontSize, color }) {
    return (
        <i
            className={className}
            style={{
                fontSize: fontSize || "20px",
                color: color || "inherit",
            }}
        ></i>
    );
}
