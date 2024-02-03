export default function formatPrice(value){
    let valuePrice = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    });
    return valuePrice;
}
