

    
    import mongoose,{ Document,  Model, model, Types } from "mongoose"
    const Schema = mongoose.Schema;

     

    
    export interface finishInterface {
      name : string,
      shelf : string,
      spot : string,
      inventory : number,
      
      
      
      
      
      
      
      
    }
     

     

    export interface SampleInterface {
      name : string,
      die : string,
      type : string,
      finish : finishInterface[],
      
      
      
      
      
      
      
      
  

    }

     
    type SampleDocumentProps = {
      finish: Types.DocumentArray<finishInterface>
    }
   

     

    type SampleModelType = Model<SampleInterface, {}, SampleDocumentProps>;

   
     

    const Sample = mongoose.model <SampleInterface, SampleModelType>('Sample', new Schema<SampleInterface, SampleModelType>({
        finish : [new Schema<finishInterface>({
         name : String , shelf : String , spot : String , inventory : Number 
      })],
   
      name : String,
      die : String,
      type : String,
      
      
      
      
      
      
      
      
      

    }))

     
  
  
    export default Sample 
    
    