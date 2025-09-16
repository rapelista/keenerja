import { UsersTable } from '~/components/(authed)/users/table';

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
      </div>

      <UsersTable />
    </div>
  );
}
