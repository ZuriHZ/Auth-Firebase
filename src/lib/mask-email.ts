export function maskEmail(email: string) {
    if (!email) return "";

    const [name, domain] = email.split("@");
    const visible = name.slice(0, 2); // primeras letras
    return `${visible}****@${domain}`;
}
