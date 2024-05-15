import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" },
});

const orderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, required: true },
});

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model("orders", orderSchema);
export const OrderItemModel = mongoose.model("orderItems", orderItemSchema);
export const PaymentModel = mongoose.model("payments", paymentSchema);

