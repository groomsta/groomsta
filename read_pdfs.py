import fitz  # PyMuPDF
import os

# List of PDF files to read
pdf_files = [
    "Groomsta 4-Week Engineering Execution Plan.pdf",
    "Groomsta App Flow Document.pdf",
    "Groomsta Backend Structure Document.pdf",
    "Groomsta Cybersecurity Guidelines.pdf",
    "Groomsta Frontend Structure Document.pdf",
    "Groomsta PRD (Product Requirements Doc).pdf"
]

output_dir = "docs_text"
os.makedirs(output_dir, exist_ok=True)

for pdf_file in pdf_files:
    if os.path.exists(pdf_file):
        print(f"\n{'='*60}")
        print(f"Reading: {pdf_file}")
        print('='*60)
        
        try:
            doc = fitz.open(pdf_file)
            full_text = ""
            
            for page_num in range(len(doc)):
                page = doc[page_num]
                text = page.get_text()
                full_text += f"\n--- Page {page_num + 1} ---\n{text}"
            
            doc.close()
            
            # Save to text file
            output_file = os.path.join(output_dir, pdf_file.replace('.pdf', '.txt'))
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(full_text)
            
            print(f"Extracted {len(doc)} pages -> {output_file}")
            
            # Print first 2000 chars as preview
            print("\n--- PREVIEW ---")
            print(full_text[:2000])
            
        except Exception as e:
            print(f"Error reading {pdf_file}: {e}")
    else:
        print(f"File not found: {pdf_file}")

print("\n" + "="*60)
print("All PDFs processed! Text files saved to ./docs_text/")
