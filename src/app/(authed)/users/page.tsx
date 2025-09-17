import { UsersTable } from '~/components/(authed)/users/table';
import { Skeleton } from '~/components/ui/skeleton';

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-gray-600">
            Manage and view all users in the system
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Users</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          {/* <div className="text-2xl font-bold">2,543</div> */}
          <Skeleton className="h-8 w-20" />
          <p className="text-xs text-muted-foreground">
            <Skeleton className="h-2 w-10 inline-block" />
            {/* +20.1% from last month */}
          </p>
        </div>

        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Verified Users</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
            </svg>
          </div>
          {/* <div className="text-2xl font-bold">1,982</div> */}
          <Skeleton className="h-8 w-20" />
          <p className="text-xs text-muted-foreground">
            <Skeleton className="h-2 w-10 inline-block" />
            {/* +15% from last month */}
          </p>
        </div>

        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Active Today</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </div>
          <Skeleton className="h-8 w-20" />
          {/* <div className="text-2xl font-bold">573</div> */}
          <p className="text-xs text-muted-foreground">
            <Skeleton className="h-2 w-10 inline-block" />
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border rounded-xl p-6">
        <UsersTable />
      </div>
    </div>
  );
}
