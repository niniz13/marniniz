"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-hot-toast";
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
  const [saveStatus, setSaveStatus] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  // --- ÉTAT DE CHARGEMENT (Skeletons) ---
  if (status === "loading") {
    return (
      <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
          <h1 className="text-4xl font-extrabold mb-10 text-center">
            Paramètres du compte
          </h1>

          <div className="max-w-xl mx-auto flex flex-col gap-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
            {/* Image Skeleton */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton
                variant="circular"
                width={96}
                height={96}
                animation="wave"
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
              <Skeleton
                variant="text"
                width={120}
                height={24}
                sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Nom */}
            <div>
              <Skeleton
                variant="text"
                width={80}
                height={20}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
              <Skeleton
                variant="rectangular"
                height={42}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <Skeleton
                variant="text"
                width={70}
                height={20}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
              <Skeleton
                variant="rectangular"
                height={42}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Mot de passe */}
            <div className="border-t border-white/10 pt-6">
              <Skeleton
                variant="text"
                width={160}
                height={24}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={42}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                />
              ))}
            </div>

            {/* Boutons */}
            <div className="border-t border-white/10 pt-6 flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={44}
                  width="100%"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Redirection si pas connecté
  if (!session) {
    router.push("/login");
    return null;
  }

  // Gestion du changement d’image avec preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Sauvegarde profil
  const handleSave = async () => {
    setLoading(true);
    setSaveStatus("");
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image }),
      });

      if (res.ok) {
        await update();
        setSaveStatus("success");
        setImageFile(null);
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
    // Toast de confirmation custom
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">
          Voulez-vous vraiment supprimer votre compte ? ⚠️
        </p>
        <p className="text-sm text-gray-600">
          Cette action est{" "}
          <span className="font-bold text-red-500">irréversible</span>.
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // Ferme le toast de confirmation
              const deleting = toast.loading("Suppression du compte...");
              try {
                const res = await fetch("/api/user/delete", {
                  method: "DELETE",
                });
                toast.dismiss(deleting);
                if (res.ok) {
                  toast.success("Compte supprimé 🗑️");
                  await signOut({ callbackUrl: "/" });
                } else {
                  toast.error("Erreur lors de la suppression du compte ❌");
                }
              } catch (err) {
                toast.dismiss(deleting);
                toast.error("Erreur de connexion au serveur ❌");
                console.error(err);
              }
            }}
            className="px-6 py-2 rounded-lg text-sm sm:text-base transition-all bg-red-600/80 hover:bg-red-600"
          >
            Supprimer
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-6 py-2 rounded-lg text-sm sm:text-base transition-all bg-white/10 border border-white/20 hover:bg-white/20"
          >
            Annuler
          </button>
        </div>
      </div>
    ));
  };

  // Changement de mot de passe
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Veuillez remplir les deux champs.");
      return;
    }

    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (res.ok) {
      toast.success("Mot de passe mis à jour avec succès !");
      setOldPassword("");
      setNewPassword("");
    } else {
      const text = await res.text();
      toast.error(`Erreur lors du changement de mot de passe : ${text}`);
      setPasswordMessage(`Erreur : ${text}`);
    }
  };

  const isGoogleUser = session?.user?.provider === "google";

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          Paramètres du compte
        </h1>

        <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Image de profil avec animation */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-white/10 border border-white/20 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image || "/default-avatar.svg"}
                    alt={name || "User"}
                    fill
                    unoptimized
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
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
              className="bg-transparent border border-white/20 px-3 py-2 rounded-lg w-full text-white/80 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/30"
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
              className="bg-transparent border border-white/20 px-3 py-2 rounded-lg w-full text-white/80 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Mot de passe */}
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
              </div>
            </div>
          )}

          {/* Boutons de bas de page */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {!isGoogleUser && (
              <button
                onClick={handleSave}
                disabled={loading}
                className={`flex-1 min-w-[150px] px-6 py-2 rounded-lg text-sm sm:text-base transition-all ${
                  saveStatus === "success"
                    ? "bg-green-600/80 border border-green-500"
                    : saveStatus === "error"
                    ? "bg-red-600/80 border border-red-500"
                    : "bg-white/10 border border-white/20 hover:bg-white/20"
                }`}
              >
                {loading
                  ? "..."
                  : saveStatus === "success"
                  ? "Enregistré"
                  : saveStatus === "error"
                  ? "Erreur"
                  : "Enregistrer"}
              </button>
            )}

            <button
              onClick={handleDelete}
              className="flex-1 min-w-[150px] px-6 py-2 rounded-lg text-sm sm:text-base bg-red-600/80 hover:bg-red-700 border border-red-500 transition-all"
            >
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
