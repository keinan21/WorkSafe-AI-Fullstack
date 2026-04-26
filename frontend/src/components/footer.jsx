import React from 'react'

const footer = () => {
  return (
    <footer className="py-6 bg-background border-b-3 border-foreground text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} WorkSafe AI. All rights reserved.
    </footer>
  )
}

export default footer