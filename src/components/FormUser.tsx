import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  aksi: "create" | "update" | "delete";
  user?: any; // isi saat update/delete
};

export default function FormUser({ aksi, user }: Props) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    address: {
      street: "",
      city: "",
      province: "",
      postal_code: "",
    },
  });
  
  const handleSubmit = async () => {
    const method =
      aksi === "create" ? "POST" : aksi === "update" ? "PUT" : "DELETE";

    const res = await fetch("/api/users", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log(result);
  };
  return (
    <form className="space-y-4">
      <Input
        placeholder="First Name"
        name="firstname"
        value={formData.firstname || ""}
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
      />
      <Input
        placeholder="Last Name"
        name="lastname"
        value={formData.lastname || ""}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
      />
      <Input
        type="date"
        placeholder="Birthdate"
        name="birthdate"
        value={formData.birthdate || ""}
        onChange={(e) =>
          setFormData({ ...formData, birthdate: e.target.value })
        }
      />
      <Input
        placeholder="Street"
        name="street"
        value={formData.address.street || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              street: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="City"
        name="city"
        value={formData.address.city || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              city: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Province"
        name="province"
        value={formData.address.province || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              province: e.target.value,
            },
          })
        }
      />
      <Input
        placeholder="Postal Code"
        name="postal_code"
        value={formData.address.postal_code || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              postal_code: e.target.value,
            },
          })
        }
      />
      <Button onClick={handleSubmit}>
        {aksi === "create" ? "Create" : "Update"}
      </Button>
    </form>
  );
}
