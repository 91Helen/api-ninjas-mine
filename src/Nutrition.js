export const Nutrition = ({ label, quantity, id}) => {
    return (
        <div key={id}>
            <p ><b>{label}</b> - {quantity}</p>
        </div>
    )
}