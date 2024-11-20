declare namespace API {
  type AppComplainEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    type?: number;
    contact?: string;
    content?: string;
    images?: string[];
    status?: number;
    handlerId?: number;
    remark?: string;
  };

  type getGoodsDetailParams = {
    goodsId: number;
  };

  type AppFeedbackEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    contact?: string;
    type?: number;
    content?: string;
    images?: string[];
    status?: number;
    handlerId?: number;
    remark?: string;
  };

  type AppGoodsEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    title?: string;
    price?: number;
    originalPrice?: number;
    description?: string;
    status?: number;
    sort?: number;
    type?: number;
    duration?: number;
    tag?: string;
    tagColor?: string;
  };

  type AppVersionEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    version?: string;
    type?: number;
    url?: string;
    forceUpdate?: number;
    status?: number;
    hotUpdate?: number;
    description?: string;
  };

  type BaseSysDepartmentEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    parentId?: number;
    orderNum?: number;
    parentName?: string;
  };

  type BaseSysLoginDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 验证码ID */
    captchaId: string;
    /** 验证码 */
    verifyCode: string;
  };

  type BaseSysMenuEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    parentId?: number;
    name?: string;
    perms?: string;
    type?: number;
    icon?: string;
    orderNum?: number;
    router?: string;
    viewPath?: string;
    keepAlive?: boolean;
    isShow?: boolean;
    parentName?: string;
    childMenus?: BaseSysMenuEntity[];
  };

  type BaseSysParamEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    keyName?: string;
    name?: string;
    data?: string;
    dataType?: number;
    remark?: string;
  };

  type BaseSysRoleEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    name?: string;
    label?: string;
    remark?: string;
    relevance?: number;
    menuIdList?: number[];
    departmentIdList?: number[];
  };

  type BaseSysUserEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    departmentId?: number;
    name?: string;
    username?: string;
    password?: string;
    passwordV?: number;
    nickName?: string;
    headImg?: string;
    phone?: string;
    email?: string;
    remark?: string;
    status?: number;
    departmentName?: string;
    roleName?: string;
    socketId?: string;
  };

  type captcha1Params = {
    /** 类型：svg|base64 */
    type?: string;
    /** 宽度 */
    width?: number;
    /** 高度 */
    height?: number;
  };

  type CaptchaParam = {
    type?: string;
    width?: number;
    height?: number;
  };

  type captchaParams = {
    param: CaptchaParam;
  };

  type Condition = {
    fullAmount?: number;
  };

  type CsMsgEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    sessionId?: number;
    content?: MessageContent;
    type?: number;
    status?: number;
    nickName?: string;
    avatarUrl?: string;
    adminUserName?: string;
    adminUserHeadImg?: string;
  };

  type CsSessionEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    lastMsg?: CsMsgEntity;
    adminUnreadCount?: number;
    nickName?: string;
    avatarUrl?: string;
  };

  type Dict = {
    empty?: boolean;
  };

  type DictInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    typeId?: number;
    parentId?: number;
    name?: string;
    value?: string;
    orderNum?: number;
    remark?: string;
  };

  type DictTypeEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    key?: string;
  };

  type DiscountSource = {
    type?: number;
    objectId?: number;
    info?: Record<string, any>;
  };

  type EntityInfo = {
    entityClassName?: string;
  };

  type FixturesMouldEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    background?: string;
    backgroundImage?: string;
    isHome?: number;
    status?: number;
    statusBar?: number;
    statusBarColor?: string;
    data?: string;
    form?: string;
  };

  type getPageParams = {
    id: number;
  };

  type GoodsCommentEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    goodsId?: number;
    orderId?: number;
    content?: string;
    starCount?: number;
    pics?: string[];
    nickName?: string;
    avatarUrl?: string;
  };

  type GoodsInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    typeId?: number;
    title?: string;
    subTitle?: string;
    mainPic?: string;
    pics?: string[];
    price?: number;
    sold?: number;
    content?: string;
    status?: number;
    sortNum?: number;
    specs?: GoodsSpecEntity[];
  };

  type GoodsSearchKeywordEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    sortNum?: number;
  };

  type GoodsSpecEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    goodsId?: number;
    name?: string;
    price?: number;
    stock?: number;
    sortNum?: number;
    images?: string[];
  };

  type GoodsTypeEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    parentId?: number;
    sortNum?: number;
    pic?: string;
    status?: number;
  };

  type htmlParams = {
    key: string;
  };

  type info10Params = {
    id: number;
  };

  type info11Params = {
    id: number;
  };

  type info12Params = {
    id: number;
  };

  type info13Params = {
    id: number;
  };

  type info14Params = {
    id: number;
  };

  type info15Params = {
    id: number;
  };

  type info16Params = {
    id: number;
  };

  type info17Params = {
    id: number;
  };

  type info18Params = {
    id: number;
  };

  type info19Params = {
    id: number;
  };

  type info1Params = {
    id: number;
  };

  type info20Params = {
    id: number;
  };

  type info21Params = {
    id: number;
  };

  type info22Params = {
    id: number;
  };

  type info23Params = {
    id: number;
  };

  type info24Params = {
    id: number;
  };

  type info25Params = {
    id: number;
  };

  type info26Params = {
    id: number;
  };

  type info27Params = {
    id: number;
  };

  type info28Params = {
    id: number;
  };

  type info29Params = {
    id: number;
  };

  type info2Params = {
    id: number;
  };

  type info30Params = {
    id: number;
  };

  type info31Params = {
    id: number;
  };

  type info32Params = {
    id: number;
  };

  type info33Params = {
    id: number;
  };

  type info34Params = {
    id: number;
  };

  type info35Params = {
    id: number;
  };

  type info3Params = {
    id: number;
  };

  type info4Params = {
    id: number;
  };

  type info5Params = {
    id: number;
  };

  type info6Params = {
    id: number;
  };

  type info7Params = {
    id: number;
  };

  type info8Params = {
    id: number;
  };

  type info9Params = {
    id: number;
  };

  type InfoBannerEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    description?: string;
    path?: string;
    pic?: string;
    sortNum?: number;
    status?: number;
  };

  type infoParams = {
    id: number;
  };

  type installParams = {
    /** 文件 */
    files: string[];
    /** 是否强制安装 */
    force: boolean;
  };

  type JSONConfig = {
    keyComparator?: Record<string, any>;
    ignoreError?: boolean;
    ignoreCase?: boolean;
    dateFormat?: string;
    ignoreNullValue?: boolean;
    transientSupport?: boolean;
    stripTrailingZeros?: boolean;
    checkDuplicate?: boolean;
    order?: boolean;
  };

  type JSONObject = {
    raw?: Record<string, any>;
    config?: JSONConfig;
    empty?: boolean;
  };

  type LoginParam = {
    code?: string;
    encryptedData?: string;
    iv?: string;
    phone?: string;
    smsCode?: string;
    access_token?: string;
    openid?: string;
    appId?: string;
    password?: string;
  };

  type Logistics = {
    company?: string;
    num?: string;
  };

  type MarketCouponInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    title?: string;
    description?: string;
    type?: number;
    amount?: number;
    num?: number;
    receivedNum?: number;
    startTime?: string;
    endTime?: string;
    status?: number;
    condition?: Condition;
  };

  type MarketCouponUserEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    couponId?: number;
    status?: number;
    useTime?: string;
  };

  type MessageContent = {
    type?: string;
    data?: string;
  };

  type OrderGoodsEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    orderId?: number;
    goodsId?: number;
    price?: number;
    discountPrice?: number;
    count?: number;
    remark?: string;
    goodsInfo?: GoodsInfoEntity;
    spec?: GoodsSpecEntity;
    isComment?: number;
  };

  type OrderInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    title?: string;
    payType?: number;
    payTime?: string;
    orderNum?: string;
    status?: number;
    price?: number;
    discountPrice?: number;
    discountSource?: DiscountSource;
    address?: UserAddressEntity;
    logistics?: Logistics;
    refund?: Refund;
    refundStatus?: number;
    refundApplyTime?: string;
    remark?: string;
    closeRemark?: string;
    invoice?: number;
    wxType?: number;
    goodsList?: OrderGoodsEntity[];
  };

  type PluginInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    description?: string;
    key?: string;
    hook?: string;
    readme?: string;
    version?: string;
    logo?: string;
    author?: string;
    status?: number;
    pluginJson?: PluginJson;
    config?: Record<string, any>;
    keyName?: string;
  };

  type PluginJson = {
    name?: string;
    key?: string;
    hook?: string;
    version?: string;
    description?: string;
    author?: string;
    logo?: string;
    readme?: string;
    config?: Record<string, any>;
    jarPath?: string;
  };

  type R = {
    empty?: boolean;
  };

  type RecycleDataEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    entityInfo?: EntityInfo;
    userId?: number;
    data?: Record<string, any>[];
    url?: string;
    params?: Record<string, any>;
    count?: number;
    userName?: string;
  };

  type refreshToken1Params = {
    refreshToken: string;
  };

  type RefreshTokenParam = {
    refreshToken?: string;
  };

  type Refund = {
    orderNum?: string;
    amount?: number;
    realAmount?: number;
    status?: number;
    applyTime?: string;
    time?: string;
    reason?: string;
    refuseReason?: string;
  };

  type SmsCodeParam = {
    phone?: string;
    captchaId?: string;
    code?: string;
  };

  type SpaceInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    url?: string;
    type?: string;
    classifyId?: number;
    fileId?: string;
    name?: string;
    size?: number;
    version?: number;
    filePath?: string;
    key?: string;
  };

  type SpaceTypeEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    parentId?: number;
  };

  type TaskInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    name?: string;
    jobId?: string;
    repeatCount?: number;
    every?: number;
    status?: number;
    service?: string;
    taskType?: number;
    type?: number;
    data?: string;
    remark?: string;
    cron?: string;
    nextRunTime?: string;
    startDate?: string;
    endDate?: string;
  };

  type UserAddressEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    userId?: number;
    contact?: string;
    phone?: string;
    province?: string;
    city?: string;
    district?: string;
    address?: string;
    isDefault?: boolean;
  };

  type UserInfoEntity = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    unionid?: string;
    avatarUrl?: string;
    nickName?: string;
    phone?: string;
    gender?: number;
    status?: number;
    loginType?: string;
    password?: string;
  };
}
