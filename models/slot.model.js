module.exports = mongoose => {
    const Slot = mongoose.model(
      "slot",
      mongoose.Schema(
        {
          time: String,
          location: String,
          booked: Boolean,
          type:String,
          reference: String
        },
        { timestamps: true }
      )
    );
  
    return Slot;
  };