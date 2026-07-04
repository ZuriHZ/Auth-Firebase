export const maskUID = (uid: string) => {
    if (!uid) return "";

    const visible = uid.slice(0, 4);
    const hidden = "*".repeat(Math.max(uid.length - 4, 4));

    return `${visible}${hidden}`;
};
