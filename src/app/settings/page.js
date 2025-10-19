"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Menu from "../components/menu";
import Footer from "../components/footer";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(""); // '', 'success', 'error'

  // Champs pour changement de mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-white/70">
        Loading settings...
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus("");
    try {
      let imageUrl = image;

      // If user selected a new image file, convert to base64
      if (imageFile) {
        imageUrl = image; // Already converted to base64 in handleImageChange
      }

      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image: imageUrl }),
      });
      if (res.ok) {
        // Trigger session refresh to fetch updated data from database
        await update();
        setSaveStatus("success");
        setImageFile(null);
        // Reset success message after 3 seconds
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible."
      )
    ) {
      try {
        const res = await fetch("/api/user/delete", { method: "DELETE" });
        if (res.ok) {
          alert("Compte supprimé 🗑️");
          await signOut({ callbackUrl: "/" });
        } else {
          alert("Erreur lors de la suppression du compte ❌");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage("");
    if (!oldPassword || !newPassword) {
      setPasswordMessage("Veuillez remplir les deux champs.");
      return;
    }

    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (res.ok) {
      setPasswordMessage("Mot de passe mis à jour ✅");
      setOldPassword("");
      setNewPassword("");
    } else {
      const text = await res.text();
      setPasswordMessage(`Erreur : ${text}`);
    }
  };

  const isGoogleUser = session?.user?.provider === "google";

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white ">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          Paramètres du compte
        </h1>

        <div className="max-w-xl mx-auto flex flex-col gap-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Image de profil */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-white/10 border border-white/20">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            <label
              className={`px-4 py-2 rounded-lg border border-white/20 text-sm transition-all ${
                isGoogleUser
                  ? "opacity-60 cursor-not-allowed bg-white/5"
                  : "cursor-pointer bg-white/10 hover:bg-white/20"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isGoogleUser}
                className="hidden"
              />
              Choisir une image
            </label>
            {imageFile && (
              <p className="text-xs text-white/60">{imageFile.name}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isGoogleUser}
              disabled={isGoogleUser}
              className="bg-transparent border border-white/20 px-3 py-2 rounded-lg w-full text-white/80 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={isGoogleUser}
              disabled={isGoogleUser}
              className="bg-transparent border border-white/20 px-3 py-2 rounded-lg w-full text-white/80 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* --- Changement du mot de passe --- */}
          {!isGoogleUser && (
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl font-bold mb-3">
                Changer le mot de passe
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="password"
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="bg-transparent border border-white/20 px-3 py-2 rounded-lg text-white/80 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-transparent border border-white/20 px-3 py-2 rounded-lg text-white/80 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button
                  onClick={handleChangePassword}
                  className="bg-white/10 hover:bg-white/20 transition-all px-6 py-2 rounded-lg"
                >
                  Modifier le mot de passe
                </button>
                {passwordMessage && (
                  <p className="text-sm text-center text-white/70 mt-2">
                    {passwordMessage}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Boutons de bas de page */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between">
            {!isGoogleUser && (
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-2 border rounded-lg transition-all ${
                  saveStatus === "success"
                    ? "bg-green-600/80 border-green-500"
                    : saveStatus === "error"
                    ? "bg-red-600/80 border-red-500"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
              >
                {loading
                  ? "Sauvegarde..."
                  : saveStatus === "success"
                  ? "✓ Enregistré"
                  : saveStatus === "error"
                  ? "✗ Erreur"
                  : "Enregistrer"}
              </button>
            )}

            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600/80 hover:bg-red-700 rounded-lg transition-all"
            >
              Supprimer le compte
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-6 py-2 bg-transparent border border-white/30 rounded-lg hover:bg-white/10 transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
