import { NextRequest, NextResponse } from 'next/server';
import { deployToVercel } from '@/engine/publish/publishVercel';
import { prisma } from '@/engine/store/prisma';
import path from 'path';

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.projectId }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (project.status !== 'ready') {
      return NextResponse.json(
        { error: 'Project must be ready to deploy' },
        { status: 400 }
      );
    }

    // Update status
    await prisma.project.update({
      where: { id: params.projectId },
      data: { status: 'deploying' }
    });

    // Deploy
    const workspacePath = path.join(process.cwd(), 'workspaces', params.projectId);
    const deployment = await deployToVercel(params.projectId, workspacePath);

    // Update with deployment info
    await prisma.project.update({
      where: { id: params.projectId },
      data: {
        status: 'ready',
        deploymentUrl: deployment.url
      }
    });

    return NextResponse.json(deployment);
  } catch (error) {
    await prisma.project.update({
      where: { id: params.projectId },
      data: { 
        status: 'failed',
        error: error.message 
      }
    });

    return NextResponse.json(
      { error: 'Deployment failed' },
      { status: 500 }
    );
  }
}