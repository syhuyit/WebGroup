import React, { use } from "react";

function ProductCard() {
    return (
        <div style={style.card}>
            <img src={ProductCard.image} alt={product.name} style={StyleSheet.image} /> 
            <div style={style.body}>
                <div style={StyleSheet.headerRow}>
               <h3 style={style.title}>{product.name}</h3>
               <span style={style.price}>${product.price}</span>
            </div>
                <p style={StyleSheet.desc}>{product.description}</p>
                <button style={style.btn}>Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
} 

function ProductList() {
    
    ///Tạo state để lưu trữ dữ liệu sản phẩm và trạng thái lấy từ database

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("")
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi lấy dữ liệu từ :", error);
                setLoading(false);
            });
    }, []); // Mảng rỗng để đảm bảo hàm chỉ chạy 1 lần duy nhất khi load
}
if (loading) {
    return <p style={{textAlign: "center"}}>Đang tải sản phẩm...</p>;
}

return (
    <div style={style.container}>
        <h2 style={{width: "100%", textAlign: "center", marginBottom: "20px"}}
        >Danh sách sản phẩm
        </h2>
        
        //Dùng hàm .map() để duyệt qua mảng product và render Card tương ứng cho mỗi sản phẩm

        <div style= {style.grid}>
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    </div>
);

const style = {
    container: { padding: "40px", fontFamily: "Playfair Display" },
    grid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
    },
    card: {
        width: "270px",
        boderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    image: { 
        width: "100%", 
        height: "200px", 
        objectFit: "cover" 
    },
    body: { padding: "17px" },
    headerRow: { 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },
    title: { 
        fontSize: "18px", 
        margin: "0", 
        color: "#333" 
    },
    price: { 
        fontSize: "16px", 
        color: "#b03333"
    },
    desc: { 
        fontSize: "14px", 
        color: "#666", 
        margin: "10px 0",
        lineHeight: "1.4", 
        overflow: "hidden"
    },
    button: {
        width: "100%",
        backgroundColor: "#222",
        color: "#fff",
        border: "none",
        padding: "10px",
        boderRadius: "10px",
        cursor: "pointer",
        marginTop: "10px",
    },
};