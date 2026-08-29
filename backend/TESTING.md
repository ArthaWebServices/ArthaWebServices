# API Testing Quick Reference

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Type check
npm run typecheck
```

## cURL Commands for Testing

### Health Check
```bash
curl http://localhost:4000/health
```

### Valid Project Submission
```bash
curl -X POST http://localhost:4000/api/project \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "description=We need a web application to manage our projects and team collaboration" \
  -F "phone=+1234567890" \
  -F "company=Acme Corp"
```

### With File Uploads
```bash
curl -X POST http://localhost:4000/api/project \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "description=We need a web application to manage our projects and team collaboration" \
  -F "files=@./proposal.pdf" \
  -F "files=@./requirements.docx"
```

### Test Validation Errors
```bash
# Missing required field
curl -X POST http://localhost:4000/api/project \
  -F "email=john@example.com" \
  -F "description=We need a web application to manage our projects and team collaboration"

# Invalid email
curl -X POST http://localhost:4000/api/project \
  -F "name=John Doe" \
  -F "email=not-an-email" \
  -F "description=We need a web application to manage our projects and team collaboration"

# Description too short
curl -X POST http://localhost:4000/api/project \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "description=Too short"
```

### Test Rate Limiting
```bash
# Run this script to test rate limiting
for i in {1..12}; do
  echo "Request $i:"
  curl -s -X POST http://localhost:4000/api/project \
    -F "name=Test User" \
    -F "email=test@example.com" \
    -F "description=Testing rate limiting with a valid description that meets the minimum length requirement" | jq '.message'
done
```

## JavaScript/Fetch Examples

### Basic Submission
```javascript
const formData = new FormData();
formData.append("name", "John Doe");
formData.append("email", "john@example.com");
formData.append("description", "We need a web application for project management");

const response = await fetch("http://localhost:4000/api/project", {
  method: "POST",
  body: formData
});

const data = await response.json();
console.log(data);
```

### With Error Handling
```javascript
async function submitProject(formData) {
  try {
    const response = await fetch("http://localhost:4000/api/project", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      } else if (response.status === 400 && data.errors) {
        throw new Error(`Validation errors: ${data.errors.join(", ")}`);
      } else {
        throw new Error(data.message || "An error occurred");
      }
    }

    console.log("Success:", data.message);
    console.log("Request ID:", data.requestId);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
```

### With File Upload
```javascript
async function submitProjectWithFiles(projectData, files) {
  const formData = new FormData();
  
  // Add project data
  formData.append("name", projectData.name);
  formData.append("email", projectData.email);
  formData.append("description", projectData.description);
  if (projectData.phone) formData.append("phone", projectData.phone);
  if (projectData.company) formData.append("company", projectData.company);
  
  // Add files
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch("http://localhost:4000/api/project", {
    method: "POST",
    body: formData
  });

  return response.json();
}

// Usage
const files = document.getElementById("fileInput").files;
const result = await submitProjectWithFiles({
  name: "John Doe",
  email: "john@example.com",
  description: "Project description",
  phone: "+1234567890",
  company: "Acme Corp"
}, Array.from(files));
```

## Validation Testing Checklist

### Required Fields
- [ ] Name: Min 1, Max 100 characters
- [ ] Email: Valid email format
- [ ] Description: Min 10, Max 10,000 characters

### Optional Fields
- [ ] Phone: Max 20 characters
- [ ] Company: Max 100 characters
- [ ] Google Docs: Valid URL format
- [ ] Dropbox: Valid URL format

### File Validation
- [ ] File count: Max 5 files
- [ ] File size: Max 10MB per file
- [ ] Total size: Max 20MB per request

### Security
- [ ] HTML escaping in responses
- [ ] Security headers present
- [ ] Rate limiting works
- [ ] CORS headers correct
- [ ] Request ID in responses

## Response Format Examples

### Success (200)
```json
{
  "ok": true,
  "message": "Thanks! Your project details were received. We'll be in touch within one business day.",
  "requestId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Validation Error (400)
```json
{
  "ok": false,
  "message": "Validation failed",
  "errors": [
    "name: String must contain at least 1 character(s)",
    "email: Invalid email"
  ],
  "requestId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Rate Limited (429)
```json
{
  "ok": false,
  "message": "Too many requests. Please try again later.",
  "requestId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Not Found (404)
```json
{
  "ok": false,
  "message": "Endpoint not found",
  "requestId": "123e4567-e89b-12d3-a456-426614174000"
}
```

## Common Issues

### "Too many requests" Error
- Rate limit is 10 requests per 60 seconds per IP
- Solution: Wait 60 seconds or use different IP for testing

### "Validation failed" Error
- Check error array for specific field issues
- Ensure all required fields are present
- Verify field lengths and formats

### File Upload Errors
- Maximum 5 files per submission
- Maximum 10MB per file
- Total maximum 20MB per request
- Use valid file formats (any file type accepted)

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your frontend origin
- For development: `ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173`

## Performance Testing

```bash
# Test response time
time curl http://localhost:4000/health

# Test with ab (Apache Bench)
ab -n 100 -c 10 http://localhost:4000/health

# Test with k6 (requires installation)
k6 run load-test.js
```

## Monitoring & Logs

```bash
# Check for errors in logs
grep -i error /path/to/logs

# Find all 429 responses (rate limited)
grep "429" /path/to/logs

# Find all validation errors (400)
grep "400" /path/to/logs

# Get request with specific ID
grep "request-id" /path/to/logs
```

## Integration Testing Script

```javascript
// test-endpoints.js
import fetch from "node-fetch";

const BASE_URL = "http://localhost:4000";

async function testEndpoints() {
  console.log("🧪 Testing API Endpoints...\n");

  // Test 1: Health Check
  console.log("1️⃣ Testing /health");
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  console.log(`   Status: ${healthRes.status}`);
  console.log(`   OK: ${healthData.ok}\n`);

  // Test 2: Valid Submission
  console.log("2️⃣ Testing /api/project with valid data");
  const formData = new FormData();
  formData.append("name", "Test User");
  formData.append("email", "test@example.com");
  formData.append("description", "Testing the API with valid project submission data");
  
  const submitRes = await fetch(`${BASE_URL}/api/project`, {
    method: "POST",
    body: formData
  });
  const submitData = await submitRes.json();
  console.log(`   Status: ${submitRes.status}`);
  console.log(`   OK: ${submitData.ok}\n`);

  // Test 3: Invalid Email
  console.log("3️⃣ Testing /api/project with invalid email");
  formData.set("email", "not-an-email");
  const invalidRes = await fetch(`${BASE_URL}/api/project`, {
    method: "POST",
    body: formData
  });
  const invalidData = await invalidRes.json();
  console.log(`   Status: ${invalidRes.status}`);
  console.log(`   OK: ${invalidData.ok}`);
  console.log(`   Errors: ${invalidData.errors?.join(", ")}\n`);

  console.log("✅ Testing complete!");
}

testEndpoints().catch(console.error);
```

Run with:
```bash
node test-endpoints.js
```

---

See [SECURITY.md](./SECURITY.md) for complete documentation.
