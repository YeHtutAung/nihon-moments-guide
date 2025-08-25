# CEO Management System

This document explains how to use the new dynamic CEO management system for the Nihon Moments website.

## Overview

The CEO management system allows you to dynamically update:
- CEO photo
- CEO name and title
- Company information
- Greeting messages
- Vision and commitment statements

## Features

### 1. Dynamic Data Management
- All CEO information is stored locally and can be updated in real-time
- Changes persist across browser sessions
- Easy reset to default values

### 2. Photo Management
- Update CEO photo by providing a new image path
- Supports any image format (JPG, PNG, SVG, etc.)
- Images are displayed in a clean, professional style matching the student section

### 3. Content Customization
- Edit CEO name, title, and company
- Customize greeting, vision, and commitment messages
- Real-time preview of all changes

## How to Use

### Accessing the CEO Management System

1. Navigate to `/ceo-demo` in your browser
2. Click the "Manage CEO" button to access the admin panel
3. Make your changes and click "Save Changes"
4. Use "View Preview" to see how the changes look on the website

### Updating CEO Photo

1. In the admin panel, locate the "CEO Photo" section
2. Enter the path to your new image (e.g., `/ceo-photo.jpg`)
3. Click "Update Photo"
4. The new photo will be displayed immediately

### Editing CEO Information

1. Click "Edit Information" to enable editing mode
2. Modify the fields you want to change:
   - Name
   - Title
   - Company
   - Greeting message
   - Vision message
   - Commitment message
3. Click "Save Changes" to apply your modifications

### Resetting to Default

- Use the "Reset to Default" button to restore all original values
- This will clear any customizations you've made

## File Structure

```
src/
├── data/
│   └── ceo.ts              # CEO data structure and default values
├── utils/
│   └── ceo-management.ts   # CEO data management utilities
├── components/ui/
│   ├── ceo-admin.tsx       # CEO admin interface
│   └── greeting-section.tsx # Updated greeting section component
└── pages/
    └── CEODemo.tsx         # Demo page for CEO management
```

## Technical Details

### Data Storage
- CEO data is stored in browser localStorage
- Falls back to default values if no stored data exists
- All changes are immediately reflected in the UI

### Image Requirements
- Images should be placed in the `public/` folder
- Recommended size: 128x128 pixels or larger
- Supported formats: JPG, PNG, SVG, WebP

### Responsive Design
- The CEO section is fully responsive
- Works on desktop, tablet, and mobile devices
- Maintains consistent styling across all screen sizes

## Integration

The updated greeting section automatically uses the dynamic CEO data and can be integrated into any page by importing:

```tsx
import { GreetingSection } from "@/components/ui/greeting-section";
```

## Customization

You can extend the CEO management system by:
- Adding more fields to the CEO interface
- Implementing additional message types
- Connecting to external data sources
- Adding image upload functionality

## Support

For questions or issues with the CEO management system, refer to the component files or contact the development team.
