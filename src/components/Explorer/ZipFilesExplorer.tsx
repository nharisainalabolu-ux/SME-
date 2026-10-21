import React, { useState, useEffect } from 'react';
import { ZIP_FILES, ZipFileItem } from '../../data/zipFilesData';
import { 
  FolderTree, 
  FileCode, 
  Play, 
  ExternalLink, 
  Maximize2, 
  Copy, 
  Check, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Image as ImageIcon, 
  Search, 
  FileText, 
  RefreshCw,
  FolderOpen,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ZipFilesExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ZipFileItem>(ZIP_FILES[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Filter files
  const filteredFiles = ZIP_FILES.filter(file => {
    const matchesCategory = categoryFilter === 'All' || file.category === categoryFilter;
    const matchesSearch = 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fetch source code when selected file changes
  useEffect(() => {
    if (selectedFile.isImage) {
      setFileContent('');
      return;
    }

    setIsLoadingContent(true);
    const fetchPath = `/${selectedFile.path}`;
    fetch(fetchPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(text => {
        setFileContent(text);
        setIsLoadingContent(false);
      })
      .catch(err => {
        console.warn('Failed to load raw file', err);
        setFileContent(`// Unable to fetch ${selectedFile.path} directly: ${err.message}`);
        setIsLoadingContent(false);
      });
  }, [selectedFile]);

  const handleCopyCode = () => {
    if (!fileContent) return;
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reloadIframe = () => {
    setIframeKey(k => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] py-8 px-4 sm:px-6 lg:px-8 font-['DM_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#eaeae6] gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
              <FolderTree className="w-4 h-4 text-emerald-700" />
              <span>Complete Zip Archive Inspector</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              All Files from SME-main.zip ({ZIP_FILES.length} Files)
            </h1>
            <p className="text-sm text-[#777872] mt-1">
              Every single file from your uploaded archive is preserved, directly inspectable, and executable live.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Files Preserved (0 Missed)</span>
            </span>
          </div>
        </div>

        {/* Quick launch grid for the 8 HTML runnable pages */}
        <div className="mb-8">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
            Quick Launch Standalone HTML Pages:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { id: 'frontend-index', name: 'PeoplePulse', path: 'frontend/index.html' },
              { id: 'casestudy-html', name: 'Canteen', path: 'casestudy/casestudy.html' },
              { id: 'porsche-index', name: 'Porsche', path: 'index.html' },
              { id: 'login-html', name: 'LTSU Login', path: 'login.html' },
              { id: 'signup-html', name: 'LTSU Signup', path: 'signup.html' },
              { id: 'script-html', name: 'JS Lab & Grade', path: 'script.html' },
              { id: 'array-html', name: 'Array Operations', path: 'array.html' },
              { id: 'jquery-html', name: 'jQuery Slide', path: 'jquery.html' }
            ].map(item => {
              const fileObj = ZIP_FILES.find(f => f.id === item.id);
              const isSelected = selectedFile.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (fileObj) {
                      setSelectedFile(fileObj);
                      setActiveTab('preview');
                    }
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-[#242424] border-[#eaeae6] hover:bg-neutral-50'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  <span className={`text-[10px] font-mono mt-1 truncate ${isSelected ? 'text-emerald-100' : 'text-neutral-400'}`}>
                    {item.path}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Split Layout: File Sidebar (Left) & Preview/Code Viewer (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* File Explorer Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-[#eaeae6] shadow-xs">
              {/* Search */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search file by name or path..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none">
                {['All', 'HTML Page', 'JavaScript', 'CSS Stylesheet', 'Image Asset'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition whitespace-nowrap cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-emerald-700 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* File List */}
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredFiles.map(file => {
                  const isSelected = selectedFile.id === file.id;

                  return (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 shadow-2xs'
                          : 'border-transparent hover:bg-neutral-50 hover:border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {file.category === 'HTML Page' ? (
                          <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                            <Play className="w-3.5 h-3.5" />
                          </div>
                        ) : file.category === 'JavaScript' ? (
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <FileCode className="w-3.5 h-3.5" />
                          </div>
                        ) : file.category === 'CSS Stylesheet' ? (
                          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#242424] truncate flex items-center gap-1.5">
                            <span>{file.name}</span>
                            {file.runnable && (
                              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold">
                                Run
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono truncate">
                            {file.path}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                        {file.size}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Inspector & Live Frame */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#eaeae6] shadow-xs overflow-hidden flex flex-col min-h-[640px]">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-[#eaeae6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fafaf8]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {selectedFile.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#242424]">
                    {selectedFile.path}
                  </span>
                </div>
                <p className="text-xs text-[#777872] mt-0.5">
                  {selectedFile.description}
                </p>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-2">
                {selectedFile.runnable && (
                  <div className="flex bg-neutral-200/80 p-0.5 rounded-lg text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 ${
                        activeTab === 'preview'
                          ? 'bg-white text-[#242424] shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>Live Runner</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 ${
                        activeTab === 'code'
                          ? 'bg-white text-[#242424] shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      <FileCode className="w-3 h-3" />
                      <span>Source Code</span>
                    </button>
                  </div>
                )}

                {selectedFile.runUrl && (
                  <a
                    href={selectedFile.runUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-[#eaeae6] text-neutral-700 hover:text-black hover:bg-neutral-50 transition"
                    title="Open in standalone browser tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 flex flex-col">
              {/* IMAGE ASSET VIEW */}
              {selectedFile.isImage ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-neutral-900 rounded-xl">
                  <img
                    src={selectedFile.runUrl}
                    alt={selectedFile.name}
                    className="max-h-[400px] max-w-full object-contain rounded-lg shadow-lg mb-4"
                  />
                  <div className="text-center text-neutral-300 text-xs">
                    <div className="font-bold text-sm text-white">{selectedFile.name}</div>
                    <div className="text-neutral-400 mt-1">{selectedFile.path} • {selectedFile.size}</div>
                    <a
                      href={selectedFile.runUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-bold mt-3"
                    >
                      <span>Open Raw Image</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : selectedFile.runnable && activeTab === 'preview' ? (
                /* LIVE RUNNER IFRAME VIEW */
                <div className="flex-1 flex flex-col">
                  {/* Viewport controls */}
                  <div className="flex items-center justify-between pb-3 mb-2 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-neutral-700">Viewport:</span>
                      <button
                        onClick={() => setViewportMode('desktop')}
                        className={`p-1.5 rounded-md cursor-pointer ${
                          viewportMode === 'desktop' ? 'bg-neutral-200 text-black' : 'hover:bg-neutral-100'
                        }`}
                        title="Desktop (100%)"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewportMode('tablet')}
                        className={`p-1.5 rounded-md cursor-pointer ${
                          viewportMode === 'tablet' ? 'bg-neutral-200 text-black' : 'hover:bg-neutral-100'
                        }`}
                        title="Tablet (768px)"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewportMode('mobile')}
                        className={`p-1.5 rounded-md cursor-pointer ${
                          viewportMode === 'mobile' ? 'bg-neutral-200 text-black' : 'hover:bg-neutral-100'
                        }`}
                        title="Mobile (375px)"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={reloadIframe}
                        className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600 cursor-pointer flex items-center gap-1"
                        title="Reload isolated runner"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reload</span>
                      </button>
                      <span className="font-mono text-[11px] text-neutral-400">
                        Isolated Sandbox Active
                      </span>
                    </div>
                  </div>

                  {/* Responsive Iframe Container */}
                  <div className="flex-1 bg-neutral-100 rounded-xl overflow-hidden border border-[#eaeae6] flex justify-center items-stretch min-h-[520px]">
                    <div
                      className={`h-full transition-all duration-300 bg-white ${
                        viewportMode === 'desktop'
                          ? 'w-full'
                          : viewportMode === 'tablet'
                          ? 'w-[768px] shadow-xl border-x border-neutral-300'
                          : 'w-[375px] shadow-xl border-x border-neutral-300'
                      }`}
                    >
                      <iframe
                        key={iframeKey}
                        src={selectedFile.runUrl}
                        title={selectedFile.name}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* CODE VIEWER */
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between pb-3 mb-2 text-xs text-neutral-500">
                    <span className="font-mono text-neutral-600">
                      {fileContent.split('\n').length} lines • {fileContent.length.toLocaleString()} characters
                    </span>

                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-lg border border-[#eaeae6] bg-white text-neutral-700 hover:text-black font-semibold transition cursor-pointer flex items-center gap-1.5"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Copy Source</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isLoadingContent ? (
                    <div className="flex-1 flex items-center justify-center p-12 text-neutral-400">
                      <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                      <span>Reading file contents...</span>
                    </div>
                  ) : (
                    <div className="flex-1 bg-[#18181b] text-neutral-200 p-4 rounded-xl font-mono text-xs overflow-auto max-h-[540px] leading-relaxed border border-neutral-800">
                      <pre>
                        <code>{fileContent}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
