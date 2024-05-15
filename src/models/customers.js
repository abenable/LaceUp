import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    accountCreatedAt: { type: Date, default: Date.now },
    passChangedAt: { type: Date, select: false },
    passresettoken: { type: String, select: false },
});

const shippingAddressSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
});

customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passChangedAt = Date.now();
    next();
});

customerSchema.methods.changedPassAfter = function (jwtTimestamp) {
    if (this.passChangedAt) {
        const changedTimestamp = parseInt(this.passChangedAt.getTime() / 1000, 10);
        return jwtTimestamp < changedTimestamp;
    }
    return false;
};

customerSchema.methods.correctPassword = async function (
    password,
    savedPassword
) {
    return await bcrypt.compare(password, savedPassword);
};

customerSchema.methods.createpassresetToken = function () {
    const resetToken = crypto.randomBytes(16).toString("hex");
    this.passresettoken = crypto
        .createHash("sha256", 8)
        .update(resetToken)
        .digest("hex");
    return resetToken;
};

const CustomerModel = mongoose.model("customers", customerSchema);
export default CustomerModel;
export const ShippingAddressModel = mongoose.model(
    "shippingAddresses",
    shippingAddressSchema
);

