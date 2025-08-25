import { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

interface Wish {
  _id: string;
  name: string;
  attendance: string;
  guests: number;
  message: string;
  createdAt: string;
}

const WishesList = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  // Always show the form
  const [showForm, setShowForm] = useState(true);
  
  // Form state
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchWishes = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get?page=${pageNumber}&limit=5`);
      
      const data = await response.json().catch(() => null);
      
      if (!response.ok || !data || !data.success) {
        const errorMessage = data?.message || `Error fetching wishes: ${response.statusText}`;
        console.error(errorMessage);
        return;
      }

      setWishes(data.wishes || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleRefresh = () => {
    fetchWishes(page);
  };
  
  const exportWishesToCSV = async () => {
    setExportLoading(true);
    try {
      // Fetch all wishes (using a large limit to get all)
      const response = await fetch(`/api/get?page=1&limit=1000`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch wishes for export");
      }
      
      const data = await response.json();
      
      if (!data.success || !data.wishes) {
        throw new Error("Invalid response format");
      }
      
      // Convert wishes to CSV format
      const headers = ["Nama", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa", "Tanggal"];
      const csvRows = [headers.join(",")];
      
      data.wishes.forEach((wish: Wish) => {
        // Clean the message to avoid CSV formatting issues
        const cleanMessage = wish.message.replace(/,/g, ";").replace(/"/g, "'").replace(/\n/g, " ");
        
        const date = new Date(wish.createdAt).toLocaleDateString("id-ID", {
          day: "numeric", 
          month: "long", 
          year: "numeric"
        });
        
        const row = [
          `"${wish.name}"`,
          wish.attendance,
          wish.guests,
          `"${cleanMessage}"`,
          date
        ];
        
        csvRows.push(row.join(","));
      });
      
      const csvContent = csvRows.join("\n");
      
      // Create a download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `ucapan-dan-doa-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error exporting wishes:", error);
      alert("Gagal mengunduh data. Silakan coba lagi.");
    } finally {
      setExportLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    
    // Validate form
    if (!name.trim() || !message.trim()) {
      setFormError("Nama dan ucapan harus diisi");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Add a small delay to ensure the UI shows the loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          attendance,
          guests: parseInt(guests),
          message: message.trim()
        }),
      });
      
      const responseData = await response.json().catch(() => ({ 
        success: false, 
        message: "Gagal memproses respon" 
      }));
      
      if (!response.ok || !responseData.success) {
        throw new Error(responseData?.message || "Gagal mengirim ucapan");
      }
      
      // Reset form
      setName("");
      setAttendance("Hadir");
      setGuests("1");
      setMessage("");
      setFormSuccess("Ucapan berhasil terkirim!");
      
      // Refresh wishes list after successful submission
      fetchWishes(1);
      setPage(1);
      
      // Just clear the success message after some time
      setTimeout(() => {
        setFormSuccess("");
      }, 3000);
      
    } catch (error: any) {
      console.error("Error submitting wish:", error);
      setFormError(error.message || "Gagal mengirim ucapan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-white mt-5 space-y-4">
      <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-5 rounded-lg">
          <h3 className="text-center font-ovo text-lg mb-4">Kirim Ucapan & Doa</h3>
          
          {formSuccess && (
            <div className="bg-green-500/20 border border-green-500 text-green-100 text-xs rounded-md p-2 mb-3">
              {formSuccess}
            </div>
          )}
          
          {formError && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 text-xs rounded-md p-2 mb-3">
              {formError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Nama
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#222222] text-white text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Masukkan nama Anda"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label htmlFor="attendance" className="block text-sm font-medium mb-1.5">
                  Kehadiran
                </label>
                <div className="relative">
                  <select
                    id="attendance"
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full px-4 py-3 bg-[#222222] text-white text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none"
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium mb-1.5">
                  Jumlah Tamu
                </label>
                <div className="relative">
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 bg-[#222222] text-white text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Ucapan & Doa
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#222222] text-white text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Tulis ucapan dan doa Anda untuk mempelai"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 bg-[#333333] hover:bg-[#444444] text-white text-sm rounded-md flex items-center justify-center gap-2 transition-all shadow-md"
                disabled={submitting}
              >
                {submitting ? "Mengirim..." : "Kirim Ucapan"}
                {!submitting && <span className="ml-1">➔</span>}
              </button>
            </div>
          </form>
        </div>

      <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-ovo text-lg">Ucapan & Doa</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={exportWishesToCSV}
              className={`text-white ${
                exportLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={exportLoading}
              title="Unduh rekap ucapan"
            >
              <FiDownload className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              className={`text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              title="Segarkan daftar ucapan"
            >
              {loading ? "Memuat..." : <IoMdRefresh className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {wishes.length === 0 ? (
            <p className="text-center text-sm opacity-70 py-8">Belum ada ucapan</p>
          ) : (
            wishes.map((wish) => (
              <div key={wish._id} className="mb-4 bg-white/5 rounded-md p-3">
                <div className="flex justify-between items-start">
                  <p className="font-bold font-legan text-sm">{wish.name}</p>
                  <p className="text-2xs opacity-60">
                    {new Date(wish.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <p className="text-2xs text-amber-200 mt-1">
                  {wish.attendance} • {wish.guests} {wish.guests > 1 ? "orang" : "orang"}
                </p>
                <p className="text-xs mt-2 italic">{wish.message}</p>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between mt-4 items-center px-2">
            <button
              onClick={handlePreviousPage}
              className={`text-2xs sm:text-xs py-1 px-2 rounded bg-white/10 hover:bg-white/20 text-white ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === 1}
            >
              Sebelumnya
            </button>
            <p className="text-2xs sm:text-xs">
              {page} dari {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              className={`text-2xs sm:text-xs py-1 px-2 rounded bg-white/10 hover:bg-white/20 text-white ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === totalPages}
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishesList;
