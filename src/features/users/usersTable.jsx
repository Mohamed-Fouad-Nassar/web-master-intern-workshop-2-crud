import { HiMiniEye } from "react-icons/hi2";
import { useOpenModal } from "../../hooks/useModal";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

export default function UsersTable({ users }) {
  const openModal = useOpenModal();

  return (
    <div className="my-4 overflow-x-auto text-sm">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-secondary-txt dark:text-secondary-txt-dark *:px-6 *:py-4 *:whitespace-nowrap">
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.length <= 0 ? (
            <tr>
              <td colSpan={100} className="h-[60vh] [&_div]:mx-auto">
                <Spinner />
              </td>
            </tr>
          ) : (
            users.map(({ id, name, email, role }) => (
              <tr
                key={id}
                className="odd:bg-primary-bg dark:odd:bg-primary-bg-dark even:bg-secondary-bg dark:even:bg-secondary-bg-dark text-gray-900 dark:text-white *:px-6 *:py-4 *:whitespace-nowrap"
              >
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                  <div className="max-w-fit flex gap-2 overflow-hidden *:text-lg">
                    <Button
                      onClick={() => openModal(id)}
                      variation="ghost"
                      size="sm"
                    >
                      <HiMiniEye className="text-third-txt dark:text-third-txt-dark" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
