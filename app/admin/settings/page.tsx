import connectDB from "@/libs/db";
import StoreSettings from "@/models/Settings";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  await connectDB();

  const settingsData = await StoreSettings.findOne({}).lean();

  const settings = settingsData ? JSON.parse(JSON.stringify(settingsData)) : {};

  return <SettingsForm settings={settings} />;
}
