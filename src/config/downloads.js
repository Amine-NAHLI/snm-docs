/**
 * URL de téléchargement Windows — hébergée sur Hugging Face (pas dans snm-docs).
 * Mettez à jour l'URL après upload du ZIP (voir HOSTING_RELEASE.md).
 */
export const WINDOWS_DOWNLOAD = {
  fileName: 'SNM_Windows_Portable_Complet.zip',
  size: '~5.5 GB',
  url: 'https://huggingface.co/aminenahli/snm-windows-portable/resolve/main/SNM_Windows_Portable_Complet.zip',
}

export const PLATFORMS = [
  { id: 'windows', label: 'Windows (x64)', available: true, ...WINDOWS_DOWNLOAD },
  { id: 'linux', label: 'Linux (x64)', available: false },
  { id: 'macos', label: 'macOS (Intel/Silicon)', available: false },
]
