import Button from "../components/Button.jsx";

export default function SettingsAdmin() {
  return (
    <section className="max-w-3xl rounded-[24px] border border-mist bg-ivory p-6 shadow-sm">
      <h2 className="font-serif text-3xl">Store Settings</h2>
      <div className="mt-6 grid gap-4">
        <input className="rounded-2xl border border-mist px-4 py-3" defaultValue="Juhaara" />
        <input className="rounded-2xl border border-mist px-4 py-3" defaultValue="support@juhaara.com" />
        <label className="flex items-center justify-between rounded-2xl border border-mist p-4">Push notifications <input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between rounded-2xl border border-mist p-4">Dark mode for dashboard <input type="checkbox" /></label>
        <Button>Save Settings</Button>
      </div>
    </section>
  );
}

