var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, Column, CreatedAt, DataType, HasMany, IsEmail, IsInt, IsNumeric, IsUrl, PrimaryKey, Table, UpdatedAt, Model, Unique, BeforeCreate, BeforeBulkCreate, AutoIncrement, NotEmpty } from "sequelize-typescript";
import Photo from "./photo.model.js";
import { hashPassword } from "../../utils/bcrypt.js";
let User = class User extends Model {
    static async hashingPassword(instance) {
        instance.password = await hashPassword(instance.password);
    }
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    AllowNull(false),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    IsEmail,
    AllowNull(false),
    NotEmpty,
    Unique,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Unique,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    IsUrl,
    AllowNull(false),
    NotEmpty,
    Column(DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "profile_image_url", void 0);
__decorate([
    IsInt,
    NotEmpty,
    AllowNull(false),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    IsNumeric,
    NotEmpty,
    AllowNull(false),
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    HasMany(() => Photo),
    __metadata("design:type", Array)
], User.prototype, "Photos", void 0);
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
__decorate([
    BeforeCreate,
    BeforeBulkCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashingPassword", null);
User = __decorate([
    Table({ tableName: "Users" })
], User);
export default User;
//# sourceMappingURL=user.model.js.map