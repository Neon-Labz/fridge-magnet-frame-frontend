import React from "react";

export default function GoogleSignIn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 mt-1 cursor-pointer"
      style={{ height: 48 }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_993_156)"><path d="M19.805 10.2306C19.805 9.55098 19.7443 8.86785 19.6142 8.2002H10.2V12.0498H15.6642C15.4275 13.2998 14.6775 14.3675 13.6275 15.0498V17.2998H16.6275C18.4775 15.5998 19.805 13.2306 19.805 10.2306Z" fill="#4285F4"/><path d="M10.2 20C12.7 20 14.77 19.1675 16.6275 17.2998L13.6275 15.0498C12.5775 15.7498 11.3275 16.1675 10.2 16.1675C7.79998 16.1675 5.79998 14.3675 5.07748 12.1675H2.07748V14.4825C3.92748 17.7825 6.92748 20 10.2 20Z" fill="#34A853"/><path d="M5.0775 12.1675C4.8775 11.4675 4.7725 10.7342 4.7725 10C4.7725 9.2658 4.8775 8.5325 5.0775 7.8325V5.51746H2.0775C1.4775 6.71746 1.20001 8.01746 1.20001 10C1.20001 11.9825 1.4775 13.2825 2.0775 14.4825L5.0775 12.1675Z" fill="#FBBC05"/><path d="M10.2 3.8325C11.4275 3.8325 12.5275 4.25746 13.3775 5.0658L16.6875 1.7558C14.77 0.0174609 12.7 0 10.2 0C6.92748 0 3.92748 2.21746 2.07748 5.51746L5.07748 7.83246C5.79998 5.63246 7.79998 3.8325 10.2 3.8325Z" fill="#EA4335"/></g><defs><clipPath id="clip0_993_156"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
      <span className="text-base font-medium text-[#111]">Sign in with Google</span>
    </button>
  );
}
