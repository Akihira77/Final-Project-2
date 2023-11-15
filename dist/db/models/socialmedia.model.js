var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, NotEmpty, PrimaryKey, Table, UpdatedAt, Model, } from "sequelize-typescript";
import User from "./user.model.js";
let SocialMedia = class SocialMedia extends Model {
};
__decorate([
    PrimaryKey,
    AllowNull(false),
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], SocialMedia.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", String)
], SocialMedia.prototype, "name", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", String)
], SocialMedia.prototype, "social_media_url", void 0);
__decorate([
    AllowNull(false),
    ForeignKey(() => User),
    Column(DataType.STRING),
    __metadata("design:type", String)
], SocialMedia.prototype, "UserId", void 0);
__decorate([
    BelongsTo(() => User),
    __metadata("design:type", void 0)
], SocialMedia.prototype, "user", void 0);
__decorate([
    AllowNull(false),
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], SocialMedia.prototype, "createdAt", void 0);
__decorate([
    AllowNull(false),
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], SocialMedia.prototype, "updatedAt", void 0);
SocialMedia = __decorate([
    Table({ tableName: "SocialMedias" })
], SocialMedia);
export default SocialMedia;
//# sourceMappingURL=socialmedia.model.js.map