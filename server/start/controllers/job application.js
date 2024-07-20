export const apply =("/",  (req, res) => {
  res.status(200).json({success:true ,message:"application successful"})
  console.log("ok")
  });
  
  
// router.get("/", async (req, res) => {
//     try {
//       const product = await prisma.product.findMany();
//       res.status(200).json({ product });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   });

  