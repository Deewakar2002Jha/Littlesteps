import React, { useState } from 'react';
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { motion } from 'motion/react';
import { Save, Shield, Mail, Key, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      return setError('New passwords do not match');
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');

      // Re-authenticate user first (required for sensitive operations)
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update Email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // Update Password if provided
      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      setSuccess('Credentials updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Update error:', err);
      if (err.code === 'auth/wrong-password') {
        setError('Current password is incorrect');
      } else {
        setError('Failed to update credentials: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Account Settings</h2>
            <p className="text-stone-500 text-sm">Update your login email and password</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium border border-emerald-100 flex items-center gap-2">
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        <form onSubmit={handleUpdateCredentials} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
              <Mail size={16} /> Admin Email
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Current Password</label>
                <input 
                  type="password" 
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter current password to verify"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
        <h4 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
          <AlertCircle size={18} /> Security Note
        </h4>
        <p className="text-amber-700 text-sm leading-relaxed">
          Changing your credentials will require you to sign in again on your next visit. Please ensure you remember your new password as it cannot be recovered without access to the associated email.
        </p>
      </div>
    </div>
  );
}
