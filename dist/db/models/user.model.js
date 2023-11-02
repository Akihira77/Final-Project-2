var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreatedAt, DataType, IsAlpha, IsEmail, IsInt, IsNumeric, Model, PrimaryKey, Table, UpdatedAt, } from "sequelize-typescript";
let User = class User extends Model {
};
__decorate([
    PrimaryKey,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    IsAlpha,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    IsEmail,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    IsAlpha,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    IsAlpha,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "profile_image_url", void 0);
__decorate([
    IsInt,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    IsNumeric,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    Table
], User);
export default User;
//# sourceMappingURL=user.model.js.map