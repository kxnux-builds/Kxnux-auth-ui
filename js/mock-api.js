/**
 * MockBackend.js
 * Simulates a PHP/MySQL backend with network latency
 */
class MockBackend {
    constructor() {
        this.users = [
            { email: "user@demo.com", password: "Password123!" },
            { email: "admin@lumina.com", password: "AdminPass1!" }
        ];
    }

    // Simulate checking if email exists in DB
    async checkEmailAvailability(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exists = this.users.some(u => u.email === email);
                resolve({ available: !exists });
            }, 800); // 800ms "Network Delay"
        });
    }

    // Simulate Login Validation
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(u => u.email === email && u.password === password);
                if (user) {
                    resolve({ success: true, token: "mock-jwt-token-123" });
                } else {
                    reject({ success: false, error: "Invalid email or password." });
                }
            }, 1200); // 1.2s "Processing Time"
        });
    }
}