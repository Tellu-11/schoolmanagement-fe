import { Role } from "../entity/userEntity";
import { useState } from "react";
import { createUser } from "../service/userService";

interface UserCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    roles: Role[]
}

export default function UserCreateModal({ isOpen, onClose, onSuccess, roles }: UserCreateModalProps) {
    const [formData, setFormData] = useState({
        nip: "",
        password: "123456",
        name: "",
        roles: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.nip.trim()) {
            newErrors.nip = "NIP is required";
        } else if (formData.nip.length < 3) {
            newErrors.nip = "NIP must be at least 3 characters";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            await createUser(formData);
            onSuccess();
            onClose();
            alert("Success create user " + formData.nip);
            // Reset form
            setFormData({
                nip: "",
                password: "",
                name: "",
                roles: 1,
                isActive: true,
                createdBy: 1,
                updatedBy: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            setErrors({});
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert("Failed to create user " + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose();
            // Reset form and errors when closing
            setFormData({
                nip: "",
                password: "",
                name: "",
                roles: 1,
                isActive: true,
                createdBy: 1,
                updatedBy: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            setErrors({});
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex bg-black/50 items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
                                <p className="text-sm text-gray-500">Add a new user to the system</p>
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
                                    <label htmlFor="active" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Account Status
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        {formData.isActive ? 'User will be active immediately' : 'User will be inactive'}
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
                            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create User
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}