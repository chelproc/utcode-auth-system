export const PermissionType = {
    ADMIN: 1,
    ACTIVITY_MONITOR: 3,
    NEW_USER: 2
}
export const PermissionMapToString = {
    [PermissionType.ADMIN]: "管理",
    [PermissionType.ACTIVITY_MONITOR]: "監査",
    [PermissionType.NEW_USER]: "新規ユーザー招待"
}
export function hasPermission(permissions, target) {
    return permissions.some(item => item === target || item === PermissionType.ADMIN);
}