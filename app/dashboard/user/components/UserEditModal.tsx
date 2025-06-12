import { User } from "../entity/userEntity";
import { useState, useEffect } from "react";
import { updateUser } from "../service/userService";
import { UserForm } from "../entity/userForm";

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    roles: any[];
    user: User | null;
}

export default function UserEditModal({ isOpen, onClose, onSuccess, roles, user }: UserEditModalProps) {
    const [formData, setFormData] = useState<UserForm>({
        nip: "",
        password: "",
        name: "",
        roles: 0,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && isOpen) {
            setFormData({
                nip: user.nip,
                password: "123456",
                name: user.name || "",
                roles: user.role.id,
                isActive: user.isActive ?? true,
                createdBy: user.createdBy.id,
                updatedBy: user.updatedBy.id,
                createdAt: new Date(user.createdAt).toISOString(),
                updatedAt: new Date(user.updatedAt).toISOString() || "",
            });
        }
    }, [user, isOpen]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.nip.trim()) {
            newErrors.nip = "Employee ID is required";
        } else if (formData.nip.length < 3) {
            newErrors.nip = "Employee ID must be at least 3 characters";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters (leave empty to keep current)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            const payload = {
                ...formData,
                updatedAt: new Date().toISOString(),
            };

            await updateUser(user?.id.toString() || "", payload);
            onSuccess();
            onClose();
            setErrors({});
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert("Failed to update user " + error.message);
            } else {
                alert("Failed to update user");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose();
            setErrors({});
            setShowPassword(false);
        }
    };

    if (!isOpen || !user) return null;

    return (
        <div
            className="fixed inset-0 flex bg-black/50 items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
                                <p className="text-sm text-gray-500">Update user information</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-6">
                    <div className="space-y-5">
                        {/* Employee ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Employee ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.nip
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                placeholder="Enter employee ID"
                                value={formData.nip}
                                onChange={(e) => {
                                    setFormData({ ...formData, nip: e.target.value });
                                    if (errors.nip) setErrors({ ...errors, nip: "" });
                                }}
                                disabled={isLoading}
                                required
                            />
                            {errors.nip && <p className="mt-1 text-sm text-red-600">{errors.nip}</p>}
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.name
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                    if (errors.name) setErrors({ ...errors, name: "" });
                                }}
                                disabled={isLoading}
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                                <span className="text-gray-500 font-normal ml-1">(leave empty to keep current)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 pr-12 ${errors.password
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                    placeholder="Enter new password"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if (errors.password) setErrors({ ...errors, password: "" });
                                    }}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors"
                                    value={formData.roles}
                                    onChange={(e) => setFormData({ ...formData, roles: parseInt(e.target.value) })}
                                    disabled={isLoading}
                                    required
                                >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`w-3 h-3 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                </div>
                                <div className="ml-3">
                                    <label className="text-sm font-medium text-gray-700">
                                        Account Status
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        {formData.isActive ? 'User account is active' : 'User account is inactive'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${formData.isActive ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    disabled={isLoading}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Audit Info */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Audit Information</h4>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <span className="text-blue-700 font-medium">Created By:</span>
                                    <p className="text-blue-800">{user.createdBy.name}</p>
                                </div>
                                <div>
                                    <span className="text-blue-700 font-medium">Updated By:</span>
                                    <p className="text-blue-800">{user.updatedBy.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Update User
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}