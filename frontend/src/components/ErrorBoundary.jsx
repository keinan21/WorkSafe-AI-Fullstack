import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Kalau ada error, ganti state supaya render UI fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Lu bisa lempar error ini ke Sentry atau tools log lain ke depannya
    console.error("BoldKit Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Tampilan neubrutalism saat error terjadi
      return (
        this.props.fallback || (
          <div className="p-4 text-red-600 font-bold font-mono text-sm border-2 border-red-600 bg-red-100 shadow-[4px_4px_0px_0px_#dc2626]">
            Terjadi kesalahan saat memuat komponen visual.
          </div>
        )
      );
    }
    return this.props.children;
  }
}